
# Longest Substring Without Repeating Characters
# Full problem: see ../README.md Part 3
# Run: python3 solution.py

def length_of_longest_substring(s):
    longest = 0

    for i in range(len(s)):
        substring = ""

        for j in range(i, len(s)):
            if s[j] in substring:
                break

            substring += s[j]
            longest = max(longest, len(substring))

    return longest


print(length_of_longest_substring("abcabcbb"))  # 3
print(length_of_longest_substring("bbbbb"))     # 1
print(length_of_longest_substring("pwwkew"))    # 3
