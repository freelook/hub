
## Running the server

Once the server is running, open the project in the shape of https://hub-freelook.c9users.io/.

## Init server

--- Production mode

Check git git --version. Install if not available:
$ sudo apt-get install git

cd /
git pull https://github.com/freelook/hub workspace
sudo chmod -R 777 workspace/
cd workspace

Add NODE_ENV=production to /etc/environment

--- Install Node.js

$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt install -y nodejs

Verify installation of Node.js and npm:

$ node -v
$ npm -v

--- Install MongoDB

$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
$ echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
$ sudo apt update && sudo apt install -y mongodb-org

Set config:

sudo nano /etc/mongod.conf 

storage:
  dbPath: /workspace/data/mongodb
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

Start the service and verify service status:

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

Access to files for C9 user: sudo chown -R ubuntu *

## Help

Ubuntu - https://docs.nodebb.org/en/latest/installing/os/ubuntu.html
DigitalOcean- http://www.blogsynthesis.com/install-nodebb-on-digitalocean
Cloud9 - https://community.nodebb.org/topic/7983/setting-up-nodebb-on-cloud-9
