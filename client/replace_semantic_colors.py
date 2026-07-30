from pathlib import Path

replacements = {
    # Navbar and common classes
    'bg-teal-100': 'bg-surface',
    'text-slate-900': 'text-surface-foreground',
    'text-slate-800': 'text-surface-foreground',
    'text-slate-200': 'text-surface-foreground',
    'bg-slate-900': 'bg-surface',
    'dark:text-slate-100': 'dark:text-surface-foreground',
    'dark:bg-slate-800': 'dark:bg-surface',
    'dark:border-slate-600': 'dark:border-border',

    # Buttons and cards
    'bg-red-600': 'bg-destructive',
    'bg-red-700': 'bg-destructive',
    'text-white': 'text-surface-foreground',
    'hover:bg-red-700': 'hover:bg-destructive/90',

    'bg-teal-700': 'bg-primary',
    'bg-teal-600': 'bg-primary',
    'bg-teal-800': 'bg-primary',
    'text-teal-800': 'text-primary',
    'text-teal-700': 'text-primary',
    'text-teal-600': 'text-primary',
    'text-teal-500': 'text-primary',
    'text-teal-900': 'text-primary',
    'bg-teal-50': 'bg-muted',
    'bg-teal-200': 'bg-muted',
    'bg-teal-300': 'bg-muted',
    'bg-gray-50': 'bg-muted',
    'bg-gray-100': 'bg-muted',
    'bg-gray-200': 'bg-muted',
    'bg-gray-300': 'bg-muted',
    'bg-gray-100': 'bg-muted',
    'text-gray-700': 'text-muted-foreground',
    'text-gray-800': 'text-muted-foreground',
    'text-gray-600': 'text-muted-foreground',
    'text-gray-500': 'text-muted-foreground',
    'text-gray-900': 'text-muted-foreground',
    'border-gray-100': 'border-border',
    'border-gray-200': 'border-border',
    'border-teal-200': 'border-border',
    'border-teal-300': 'border-border',
    'border-teal-400': 'border-border',

    'focus:ring-teal-500': 'focus:ring-primary',
    'focus:border-teal-500': 'focus:border-primary',
    'hover:bg-gray-300': 'hover:bg-muted/90',
    'hover:bg-gray-100': 'hover:bg-muted/90',
    'hover:bg-gray-900': 'hover:bg-muted/90',
    'hover:text-gray-800': 'hover:text-muted-foreground',
    'hover:text-gray-500': 'hover:text-muted-foreground',
    'bg-white': 'bg-card',
    'bg-purple-100': 'bg-surface',
    'bg-blue-100': 'bg-surface',
    'bg-blue-200': 'bg-muted',
    'bg-green-50': 'bg-muted',
    'bg-blue-600': 'bg-info',
    'bg-blue-700': 'bg-info',
    'bg-green-600': 'bg-success',
    'bg-green-700': 'bg-success',
    'hover:bg-green-700': 'hover:bg-success/90',
    'text-green-700': 'text-success',
    'text-green-600': 'text-success',
    'bg-blue-400': 'bg-info',
    'bg-purple-50': 'bg-muted',
    'text-purple-700': 'text-accent',
    'text-purple-600': 'text-accent',
    'border border-gray-200': 'border border-border',
}

base_styles = {
    'bg-teal-100 text-slate-900 px-4 py-8 flex justify-between items-center relative dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300':
    'bg-surface text-surface-foreground px-4 py-8 flex justify-between items-center relative dark:bg-surface dark:text-surface-foreground transition-colors duration-300',
    'text-slate-800 ml-auto flex items-center space-x-4 text-lg font-bold dark:text-slate-200':
    'text-surface-foreground ml-auto flex items-center space-x-4 text-lg font-bold dark:text-surface-foreground',
    'rounded-full border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/80 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600':
    'rounded-full border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/80 dark:bg-surface dark:text-surface-foreground dark:border-border',
    'bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded':
    'bg-destructive hover:bg-destructive/90 text-destructive-foreground px-2 py-2 rounded',
}

# Patch tailwind config
config_path = Path('tailwind.config.js')
text = config_path.read_text(encoding='utf-8')
old = "background: 'hsl(var(--background))',\n\t\t\tforeground: 'hsl(var(--foreground))',"
new = "background: 'hsl(var(--background))',\n\t\t\tsurface: 'hsl(var(--surface))',\n\t\t\t'surface-foreground': 'hsl(var(--surface-foreground))',\n\t\t\tforeground: 'hsl(var(--foreground))',"
if old in text:
    text = text.replace(old, new)
else:
    print('tailwind background block not found')

old2 = "\t\t\t\tmuted: {\n\t\t\t\t\tDEFAULT: 'hsl(var(--muted))',\n\t\t\t\t\tforeground: 'hsl(var(--muted-foreground))'\n\t\t\t\t},\n\t\t\t\taccent: {\n"
new2 = "\t\t\t\tmuted: {\n\t\t\t\t\tDEFAULT: 'hsl(var(--muted))',\n\t\t\t\t\tforeground: 'hsl(var(--muted-foreground))'\n\t\t\t\t},\n\t\t\t\tsuccess: {\n\t\t\t\t\tDEFAULT: 'hsl(var(--success))',\n\t\t\t\t\tforeground: 'hsl(var(--success-foreground))'\n\t\t\t\t},\n\t\t\t\twarning: {\n\t\t\t\t\tDEFAULT: 'hsl(var(--warning))',\n\t\t\t\t\tforeground: 'hsl(var(--warning-foreground))'\n\t\t\t\t},\n\t\t\t\tinfo: {\n\t\t\t\t\tDEFAULT: 'hsl(var(--info))',\n\t\t\t\t\tforeground: 'hsl(var(--info-foreground))'\n\t\t\t\t},\n\t\t\t\taccent: {\n"
if old2 in text:
    text = text.replace(old2, new2)
else:
    print('tailwind muted block not found')

config_path.write_text(text, encoding='utf-8')
print('tailwind.config.js patched')

changed_files = []
for path in sorted(Path('src').rglob('*.jsx')):
    text = path.read_text(encoding='utf-8')
    new_text = text
    for exact_old, exact_new in base_styles.items():
        new_text = new_text.replace(exact_old, exact_new)
    for old, new in replacements.items():
        new_text = new_text.replace(old, new)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        changed_files.append(str(path))

print('changed files:')
for file in changed_files:
    print(file)
