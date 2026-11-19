with open('src/data/blog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

bad_text = "como Let's Encrypt y Cloudflare"
fixed_text = "como Let\\'s Encrypt y Cloudflare"

if bad_text in text:
    text = text.replace(bad_text, fixed_text)
    with open('src/data/blog.ts', 'w', encoding='utf-8') as f:
        f.write(text)
    print("FIXED SUCCESSFULLY")
else:
    print("NOT FOUND")

