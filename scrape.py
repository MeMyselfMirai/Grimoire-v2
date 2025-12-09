import os
import json
import requests
from requests.exceptions import HTTPError

with open("public/data/Released_Homebrew.json", encoding="UTF8") as f:
    data = json.load(f)[1:]

out = {}
for i, item in enumerate(data):
    item_id = item["id"][:-4]
    item["id"] = item_id
    print(item_id, f"{i}/{len(data)}")

    local_urls = []
    for image_url in item["image"]:
        path = "public/assets/icons/official/" + item_id
        # Evil
        if item_id + "_e" in image_url:
            path += "_e.webp"
        # Good
        elif item_id + "_g" in image_url:
            path += "_g.webp"
        # Fabled / other
        else:
            path += ".webp"
        local_urls.append(path.split("/", 1)[1])
        
        if os.path.exists(path):
            continue

        try:
            img = requests.get(image_url, timeout=10)
            img.raise_for_status()
        except HTTPError as e:
            raise e
        
        
        with open(path, "wb") as f:
            f.write(img.content)
    item["image"] = local_urls
    if "reminders" in item:
        item["reminders"] = list(set(item["reminders"]))

    out[item_id] = item

with open("public/data/attempt.json", "w") as f:
    json.dump(out,f, indent=4)

