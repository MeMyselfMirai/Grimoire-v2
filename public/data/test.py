
import json

with open("attempt.json") as f:
    new = json.load(f)

with open("old.json") as f:
    old = json.load(f)

ids = set(new.keys()) | set(old.keys())

out = {}

for item in ids:
    if item in old and item not in new:
        out[item] = old[item]
        if "jinx" in out[item]:
            out[item]["jinxes"] = out[item]["jinx"]
            del out[item]["jinx"]
        continue
    if item in new and item not in old:
        out[item] = new[item]
        continue
    role = old[item]
    for k,v in new[item].items():
        role[k] = v
    if "jinx" in role:
        role["jinxes"] = role["jinx"]
        del role["jinx"]
    out[item] = role
