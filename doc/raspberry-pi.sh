#! /bin/sh

sudo apt-get update

# sometimes useful on raspbian for checkout github repositories
sudo apt-get install -y apt-transport-https
sudo apt-get install -y build-essential vim# always useful

# node js
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs npm
sudo ln -s /usr/bin/nodejs /usr/local/bin/node
sudo ln -s /usr/bin/npm /usr/local/bin/npm

# authorize node js to use port < 1024
# https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep /usr/bin/nodejs

sudo npm install pm2 -g
sudo npm install gulp -g

# git
sudo apt-get install -y git # theorically already done
# git config --global user.name "jarvis"
# git config --global user.email "pi@jarvis"

# mongo
#sudo apt-get install -y mongodb-server

# for music
sudo apt-get install -y mpg123 amixer network-manager
