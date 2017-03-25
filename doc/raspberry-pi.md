# Raspberry pi

## Install distribution

```javascript

$ wget https://downloads.raspberrypi.org/raspbian_lite_latest -O raspbian.zip
$ unzip raspbian.zip

// find the name of the extracted img file. We called it raspbian.img

$ df -h

// insert SD card

$ df -h

// find the disk by difference. We called it /dev/sdb1

$ umount /dev/sdb1

// umount all new disks /dev/sdb2, /dev/sdb3, extracted

$ dd bs=4M if=raspbian.img of=/dev/sdb

$ sync

// eject sd card, start the raspberry pi

// in theory the raspberry pi is accessible with url jarvis.local/

// but you can also access it with ip address. In order to find the ip of the raspberry pi:
$ nmap -sn 192.168.1.0/24
```

* https://www.raspberrypi.org/downloads/raspbian/
* https://www.raspberrypi.org/documentation/installation/installing-images/linux.md
* [How to config the raspberry pi](https://www.raspberrypi.org/documentation/configuration/)
* https://github.com/jas-/node-libnmap

## Wifi

Thanks to `network-manager`, you can use command `nmcli` on rapsberry pi. However, sometimes, it is not enough and node js won't be able to use wifi.

This situation may be detected with command:

```javascript
$ nmcli device status
DEVICE  TYPE      STATE      CONNECTION
eth0    ethernet  unmanaged  --         
lo      loopback  unmanaged  --         
wlan0   wifi      unmanaged  --    
```

If all interfaces are unmanaged, so you can't use nmcli to manage wifi interfaces. You need to change this configuration.

```javascript
// Just in case
$ sudo cp /etc/NetworkManager/NetworkManager.conf /etc/NetworkManager/NetworkManager.conf.backup

$ sudo vim /etc/NetworkManager/NetworkManager.conf

// change the line managed=false to managed=true

// then restart the service

$ sudo service network-manager restart

// You should have now this configuration

$ nmcli device status
DEVICE  TYPE      STATE        CONNECTION
eth0    ethernet  connected    eth0       
wlan0   wifi      unavailable  --         
lo      loopback  unmanaged    --
```




* [Use wifi on raspberry pi](http://askubuntu.com/questions/71159/network-manager-says-device-not-managed)


## Install software layer

Once the raspbian is accessible, we need to setup the software layer:

```javascript

// for raspberry pi
$ sudo apt-get install git
$ git clone https://github.com/home-os/home-os.git ~/home-os

$ cd ~/home-os
$ sudo sh ./setup/raspberry-pi.sh

$ git clone https://github.com/adobe/node-smb-server.git ~/node-smb-server
$ cd ~/node-smb-server

```
