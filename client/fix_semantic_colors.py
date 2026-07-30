from pathlib import Path
import re

root = Path('.')

# Patch tailwind config with semantic tokens
config_path = root / 'tailwind.config.js'
text = config_path.read_text(encoding='utf-8')
new_text = text

# Add surface tokens after background
new_text = re.sub(
    r"background: 'hsl\(var\(--background\)\)',\s*\n(\s*)foreground: 'hsl\(var\(--foreground\)\)',",
    r"background: 'hsl(var(--background))',\n\1surface: 'hsl(var(--surface))',\n\1'surface-foreground': 'hsl(var(--surface-foreground))',\n\1foreground: 'hsl(var(--foreground))',",
    new_text
)

# Insert success/warning/info before accent
new_text = re.sub(
    r"(muted:\s*{\s*DEFAULT: 'hsl\(var\(--muted\)\)',\s*foreground: 'hsl\(var\(--muted-foreground\)\)'\s*},\s*)(accent:\s*{)",
    r"\1success: {\n\t\t\t\tDEFAULT: 'hsl(var(--success))',\n\t\t\t\tforeground: 'hsl(var(--success-foreground))'\n\t\t\t},\n\t\t\twarning: {\n\t\t\t\tDEFAULT: 'hsl(var(--warning))',\n\t\t\t\tforeground: 'hsl(var(--warning-foreground))'\n\t\t\t},\n\t\t\tinfo: {\n\t\t\t\tDEFAULT: 'hsl(var(--info))',\n\t\t\t\tforeground: 'hsl(var(--info-foreground))'\n\t\t\t},\n\1",
    new_text,
)

if new_text != text:
    config_path.write_text(new_text, encoding='utf-8')
    print(f'Patched {config_path}')
else:
    print(f'No changes in {config_path}')

# Replacement map for exact class strings
exact_replacements = {
    # Navbar
    'bg-teal-100 text-slate-900 px-4 py-8 flex justify-between items-center relative dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300': 'bg-surface text-surface-foreground px-4 py-8 flex justify-between items-center relative dark:bg-surface dark:text-surface-foreground transition-colors duration-300',
    'text-slate-800 ml-auto flex items-center space-x-4 text-lg font-bold dark:text-slate-200': 'text-surface-foreground ml-auto flex items-center space-x-4 text-lg font-bold dark:text-surface-foreground',
    'rounded-full border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/80 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600': 'rounded-full border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/80 dark:bg-surface dark:text-surface-foreground dark:border-border',
    'bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded': 'bg-destructive hover:bg-destructive/90 text-destructive-foreground px-2 py-2 rounded',

    # About
    'min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 px-6 py-16': 'min-h-screen bg-gradient-to-tr from-surface to-muted px-6 py-16',
    'text-surface-foreground bg-gray-800 px-4 py-2 rounded hover:bg-muted/90 transition': 'text-surface-foreground bg-muted px-4 py-2 rounded hover:bg-muted/90 transition',

    # DoctorDashboard
    'text-lg font-semibold text-blue-800': 'text-lg font-semibold text-info',
    'text-blue-500 underline mt-2 inline-block': 'text-info underline mt-2 inline-block',

    # HospitalDashboard
    'text-lg font-semibold text-blue-800': 'text-lg font-semibold text-info',
    'text-blue-500 underline mt-2 inline-block': 'text-info underline mt-2 inline-block',

    # PatientDashboard
    'p-6 bg-gradient-to-tr from-blue-100 to-purple-200 min-h-screen': 'p-6 bg-gradient-to-tr from-surface to-muted min-h-screen',
    'absolute top-2 right-3 text-xl text-muted-foreground hover:text-red-500': 'absolute top-2 right-3 text-xl text-muted-foreground hover:text-destructive',
    'bg-purple-300 p-3 rounded-lg shadow-inner hover:shadow-md hover:scale-[1.01] transition': 'bg-accent/30 p-3 rounded-lg shadow-inner hover:shadow-md hover:scale-[1.01] transition',
    'text-blue-500 underline mt-2 inline-block': 'text-info underline mt-2 inline-block',

    # HomePage
    'min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 relative': 'min-h-screen bg-gradient-to-tr from-surface to-muted relative',
    'text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2': 'text-xl font-semibold text-info mb-4 flex items-center gap-2',
    'w-5 h-5 text-blue-600': 'w-5 h-5 text-info',
    'relative font-bold text-accent transition-all duration-300 hover:text-purple-900 hover:scale-105 inline-block after:content-[\'\'] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-900 after:transition-all after:duration-300 hover:after:w-full': 'relative font-bold text-accent transition-all duration-300 hover:text-accent/90 hover:scale-105 inline-block after:content-[\'\'] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full',
    'flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-red-400 hover:scale-[1.02] hover:shadow-md': 'flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-destructive/70 hover:scale-[1.02] hover:shadow-md',
    'flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-green-400 hover:scale-[1.02] hover:shadow-md': 'flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-success/70 hover:scale-[1.02] hover:shadow-md',

    # Feedback
    'min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4': 'min-h-screen bg-gradient-to-br from-surface to-muted flex items-center justify-center p-4',

    # Login
    'flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4': 'flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-surface to-muted px-4',

    # Signup
    'flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 px-4': 'flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-surface to-muted px-4',

    # Payment
    'p-6 min-h-screen bg-gray-100': 'p-6 min-h-screen bg-surface',
    'text-3xl font-bold mb-6 text-center text-teal-700': 'text-3xl font-bold mb-6 text-center text-primary',
}

# Replace exact strings in files
changed_files = []
for rel_path in [
    'src/components/Navbar.jsx',
    'src/pages/About.jsx',
    'src/pages/Dashboards/DoctorDashboard.jsx',
    'src/pages/Dashboards/HospitalDashboard.jsx',
    'src/pages/Dashboards/PatientDashboard.jsx',
    'src/pages/HomePage.jsx',
    'src/pages/Feedback.jsx',
    'src/pages/LoginPage.jsx',
    'src/pages/SignupPage.jsx',
    'src/pages/PaymentPage.jsx',
]:
    path = root / rel_path
    if not path.exists():
        print(f'Missing {path}')
        continue
    text = path.read_text(encoding='utf-8')
    new_text = text
    for old, new in exact_replacements.items():
        if old in new_text:
            new_text = new_text.replace(old, new)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        changed_files.append(rel_path)

print('changed files:')
for file in changed_files:
    print(file)
