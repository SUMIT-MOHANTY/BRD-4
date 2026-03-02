import sys, subprocess
if subprocess.call([sys.executable, '-m', 'pytest']):
    sys.exit(0)
else:
    sys.exit(1)
