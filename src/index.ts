import INetwork from './models/INetwork';
import fs from 'fs';
import IP from './models/IP';
import Subnetwork from './models/Subnetwork';
import { checkAllocatedSpace, getH, getRequirement, getSlash } from './tools/network';

const input: INetwork[] = JSON.parse(fs.readFileSync('./in.json', 'utf-8'));



input.forEach((n) => {
  const subs = n.subnetworks.map<Subnetwork>((s) => {
    const req = getRequirement(s, true);
    const h = getH(req);
    const slash = getSlash(h);

    return { h, slash, name: s.name };
  }).sort((a, b) => b.h - a.h);

  const networkIP = IP.parseIP(n.ip);
  checkAllocatedSpace(subs, networkIP.slash);
  let lastIp = networkIP.addr32;

  console.log("Net Name\tNet ID\t\t\tBroadcast\t\tGateway\t\t\tStart IP\t\tEnd IP\t\t");

  subs.forEach((s) => {
    let ip = new IP(lastIp, s.slash);
    console.log(`${s.name}\t\t${IP.convertString(ip.netID)}\t\t${IP.convertString(ip.broadcast)}\t\t${IP.convertString(ip.gateway)}\t\t${IP.convertString(ip.ipRangeStart)}\t\t${IP.convertString(ip.ipRangeEnd)}\t\t`);
    lastIp = ip.broadcast + 1;
  });

});

