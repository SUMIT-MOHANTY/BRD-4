#!/usr/bin/env python
import os
import sys

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError('Django not installed') from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
#!/usr/bin/env python3
import os, sys
if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'reservation_system.settings')
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
