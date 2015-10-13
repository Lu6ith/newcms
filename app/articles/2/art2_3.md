## Recepta na autologin w CENTOS 7

The tip came from Fedora 20 forum:

http://forums.fedoraforum.org/showthread.php?t=297228


 **1.**remove the original getty@tty1.service symlink:

```bash
    # rm /etc/systemd/system/getty.target.wants/getty@tty1.service
```



 **2.**make a copy of the getty@.service file and call it getty@tty1.service

```bash
    # cp /lib/systemd/system/getty@.service /etc/systemd/system/getty@tty1.service
```



 **3.**edit this file (the last line, must be ADDED):

```shell
    [Service]
    ...
    ExecStart=-/sbin/agetty --autologin root --noclear %I
    ...
    [Install]
    ...
    ;Alias=getty@tty1.service
```



 **4.**make a symlink in getty.target.wants

```shell
    # ln -s /etc/systemd/system/getty@tty1.service /etc/systemd/system/getty.target.wants/getty@tty1.service
```



 **5.**Reboot. It everything went fine you will be logged in as root.