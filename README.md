# net-tool

Generate network plans from a given JSON


## Getting started

### Installation
- Clone the repo with `git clone --depth=1 https://github.com/GioPan04/net-tool`
- Install the dependencies via `npm install` or `yarn`

### Input file
In order to work, net-tool requires a JSON file. The JSON file should contains all the basic info to create the network plan.

You can use the [`example.json`](https://github.com/GioPan04/net-tool/blob/main/example.json) to learn the structure of the file.

### Run the script
You can now run the script via `npm run start input-file.json` or `yarn start input-file.json`

## Example
This is the output of the script with `example.json` as input.
```
Net Name        Net ID                  Broadcast               Gateway                 Start IP                End IP
A2              192.168.0.0             192.168.0.31            192.168.0.30            192.168.0.1             192.168.0.29
A1              192.168.0.32            192.168.0.47            192.168.0.46            192.168.0.33            192.168.0.45
Net Name        Net ID                  Broadcast               Gateway                 Start IP                End IP
B3              172.28.0.0              172.28.0.255            172.28.0.254            172.28.0.1              172.28.0.253
B2              172.28.1.0              172.28.1.63             172.28.1.62             172.28.1.1              172.28.1.61
B1              172.28.1.64             172.28.1.95             172.28.1.94             172.28.1.65             172.28.1.93
```