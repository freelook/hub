
## Running the server

Once the server is running, open the project in the shape of https://hub-freelook.c9users.io/.

## Init server

--- Production mode

Check git git --version. Install if not available:
$ sudo apt-get install git

cd /
git pull https://github.com/freelook/hub workspace
sudo chmod -R 777 workspace/ - ! or add chown rights for each user and group
cd workspace

Add NODE_ENV=production to /etc/environment

--- Install Node.js

$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt install -y nodejs

Verify installation of Node.js and npm:

$ node -v
$ npm -v

--- Install MongoDB

$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
$ sudo apt update && sudo apt install -y mongodb-org

Set config:

sudo nano /etc/mongod.conf 

storage:
  dbPath: /workspace/data/mongodb
journal:
  enabled: false
wiredTiger:
  engineConfig:
    cacheSizeGB: 0.1
systemLog:
  path: /workspace/log/mongodb/mongod.log
  
mkdir data && cd "$_"
mkdir mongodb
cd ..

mkdir log
cd log
mkdir mongodb
cd ..

Make mongodb start on system startup with:

$ sudo systemctl enable mongod

Add lock removal to service:

$ sudo nano /lib/systemd/system/mongod.service

ExecStartPre=/bin/rm -f /workspace/data/mongodb/mongod.lock
ExecStartPre=/bin/rm -f /workspace/data/mongodb/WiredTiger.lock
ExecStartPre=/usr/bin/mongod --repair --dbpath /workspace/data/mongodb --wiredTigerCacheSizeGB 0.1
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

Start the service and verify service status:

$ sudo chown -R mongodb:mongodb /workspace/*
$ sudo chmod g+s /workspace
$ sudo chown -R mongodb:mongodb /tmp/*
$ sudo chmod g+s /tmp
$ sudo service mongod start
$ sudo service mongod status

For cloud9 just run:

$ echo 'mongod --bind_ip=$IP --dbpath=data/mongodb --logpath=log/mongodb/mongod.log --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
$ ./mongod &

Open mongo shell

$ mongo
> use admin
> db.createUser( { user: "<Enter a username>", pwd: "<Enter a secure password>", roles: [ { role: "readWriteAnyDatabase", db: "admin" }, { role: "userAdminAnyDatabase", db: "admin" } ] } )
> use nodebb
> db.createUser( { user: "nodebb", pwd: "<Enter a secure password", roles: [ { role: "readWrite", db: "nodebb" }, { role: "clusterMonitor", db: "admin" } ] } )
> quit()

Enable sequrity:

sudo nano /etc/mongod.conf

security:
  authorization: enabled
  
Restart and check connection:

$ sudo service mongod restart
$ mongo -u your_username -p your_password --authenticationDatabase=admin

--- Install NodeBB

$ sudo apt-get install -y build-essential
$ sudo git clone https://github.com/NodeBB/NodeBB.git nodebb

$ cd nodebb
$ sudo npm install --production
$ sudo ./nodebb setup
$ sudo ./nodebb start

$ sudo adduser --system --group nodebb
$ sudo chown -R nodebb:nodebb /workspace

To start automatically:

sudo nano /lib/systemd/system/nodebb.service

[Unit]
Description=NodeBB forum for Node.js.
Documentation=http://nodebb.readthedocs.io/en/latest/
After=system.slice multi-user.target
Wants=mongod.service

[Service]
Type=simple
User=nodebb

StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=nodebb

Environment=NODE_ENV=production
WorkingDirectory=/workspace/nodebb
ExecStart=/usr/bin/node loader.js --no-daemon --no-silent
Restart=always

[Install]
WantedBy=multi-user.target

Finally, enable and start NodeBB:

$ sudo systemctl enable nodebb
$ sudo service nodebb start
$ sudo service nodebb status

Access to files for C9 user: sudo chown -R ubuntu *

--- Install nginx

$ sudo add-apt-repository -y ppa:nginx/stable
$ sudo apt-get update
$ sudo apt-get install -y nginx
$ sudo systemctl enable nginx

$ cd /etc/nginx/sites-enabled/
$ sudo rm default
$ sudo ln -s /workspace/nginx /etc/nginx/sites-enabled/nginx
$ cd /workspace/
$ nano nginx

Paste config:

server {
    listen 80;

    server_name __SERVER_IP__;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://127.0.0.1:__SERVER_PORT__;
        proxy_redirect off;

        # Socket.IO Support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

Run nginx server:

$ sudo service nginx start
$ sudo service nginx status
$ sudo service nginx reload
$ sudo service nginx stop

Test:

sudo nginx -c /etc/nginx/nginx.conf -t

-- Install redis

$ sudo apt-add-repository ppa:chris-lea/redis-server
$ sudo apt-get update
$ sudo apt-get install redis-server

$ sudo nano /etc/redis/redis.conf 
supervised systemd
logfile /workspace/log/redis/redis-server.log
dir /workspace/data/redis
requirepass foobared -> set password
maxmemory 128mb

sudo chown -R redis:redis /var/run/redis  
sudo chmod g+s /var/run/redis

Check /etc/systemd/system/multi-user.target.wants/
      /etc/systemd/system for redis and rm

sudo nano /etc/systemd/system/redis.service

[Unit]
Description=Redis Datastore Server
After=network.target

[Service]
Type=forking
PIDFile=/var/run/redis/redis-server.pid
User=redis
Group=redis

ExecStart=/usr/bin/redis-server /etc/redis/redis.conf
ExecReload=/bin/kill -USR2 $MAINPID
ExecStop=/usr/bin/redis-cli -a <pass> shutdown
Restart=always

[Install]
WantedBy=multi-user.target

sudo systemctl enable redis

## Help

Ubuntu - https://docs.nodebb.org/en/latest/installing/os/ubuntu.html
DigitalOcean- http://www.blogsynthesis.com/install-nodebb-on-digitalocean
Cloud9 - https://community.nodebb.org/topic/7983/setting-up-nodebb-on-cloud-9

SWAP - https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04
