# Two Sum — scratch file for class
# Problem details: see TWO_SUM.md (same folder)
# Optional: fill this in during the walkthrough. No need to "pass tests" today.


from pyparsing import nums


def two_sum(nums, target):
    seen = {}

    for i in range(len(nums)):
        complement = target - nums[i]

        if complement in seen:
            return [seen[complement], i]

        seen[nums[i]] = i
    return []
    # your code here


# quick sanity check (optional)
print(two_sum([2, 7, 11, 15], 9))  # expect something like [0, 1]
print(two_sum([3, 2, 4], 6))       # expect [1, 2]
print(two_sum([3, 3], 6))       # expect [0, 1]