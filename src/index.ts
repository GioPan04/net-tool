import INetwork from './models/INetwork';
import fs from 'fs';
import ISubnetwork from './models/ISubnetwork';
import IP from './models/IP';
import Subnetwork from './models/Subnetwork';

const input: INetwork[] = JSON.parse(fs.readFileSync('./in.json', 'utf-8'));

const getRequirement = (sub: ISubnetwork, futureExpansions?: boolean) => {
  const req = (
    1 +   // Gateway
    (sub.pc || 0) +
    (sub.printers || 0) +
    (sub.servers || 0)
  );

  if(!futureExpansions) return req;

  return req + Math.ceil(req * 0.3)
}

const getH = (requirement: number) => {
  // 2^h - 2 >= req

  const req = requirement + 2;
  let h = 2;

  while(Math.pow(2, h) < req) h++;

  return h;
};

const getSlash = (h: number) => 32 - h; 

const checkAllocatedSpace = (subs: Subnetwork[], originalIPSlash: number) => {
  const totalReq = subs.reduce((p, c) => p + Math.pow(2, c.h), 0);
  const h = getH(totalReq);
  const slash = getSlash(h);

  if(slash < originalIPSlash) throw `The network doesn't fit in the original IP.\nNetwork /: ${slash}\nOriginal network /: ${originalIPSlash}`;
}

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

