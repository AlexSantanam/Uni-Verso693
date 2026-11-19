with open('src/pages/PaginasWeb.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect the target pricing section
target_start = '{/* Pricing / Packages Section */}'
target_end = '{/* 3-Step Simple Process */}'

start_idx = text.find(target_start)
end_idx = text.find(target_end)

if start_idx != -1 and end_idx != -1:
    print(f"Found section: {start_idx} to {end_idx}")
    current_section = text[start_idx:end_idx]
    print(f"Length: {len(current_section)}")
else:
    print("Section not found!")
