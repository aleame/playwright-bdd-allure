---
trigger: always_on
---

---
description: Control shell commands..
denyAuto:["rm -rf", "rmdir", "git reset --hard", "git push --force", "git push --fd", "mkfs.*", "fdisk", "unlink /", "kill", "killall", "pkill", "reboot", "shutdown -h now", "sudo", "curl | bash"]