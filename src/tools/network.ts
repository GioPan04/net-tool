import ISubnetwork from '../models/ISubnetwork';
import Subnetwork from '../models/Subnetwork';

export const getRequirement = (sub: ISubnetwork, futureExpansions?: boolean) => {
  const req = (
    1 +   // Gateway
    (sub.pc || 0) +
    (sub.printers || 0) +
    (sub.servers || 0)
  );

  if(!futureExpansions) return req;

  return req + Math.ceil(req * 0.3)
}

export const getH = (requirement: number) => {
  // 2^h - 2 >= req

  const req = requirement + 2;
  let h = 2;

  while(Math.pow(2, h) < req) h++;

  return h;
};

export const getSlash = (h: number) => 32 - h; 

export const checkAllocatedSpace = (subs: Subnetwork[], originalIPSlash: number) => {
  const totalReq = subs.reduce((p, c) => p + Math.pow(2, c.h), 0);
  const h = getH(totalReq);
  const slash = getSlash(h);

  if(slash < originalIPSlash) throw `The network doesn't fit in the original IP.\nNetwork /: ${slash}\nOriginal network /: ${originalIPSlash}`;
}