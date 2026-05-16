---
title: The 4th Linux kernel flaw this month can lead to stolen SSH host keys
date: '2026-05-15'
excerpt: >-
  Tech Home Tech Security The 4th Linux kernel flaw this month can lead to
  stolen SSH host keys The good news is there's already a patch. The bad news
  i...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Work
category: Work
source: >-
  https://www.zdnet.com/article/qualys-flags-a-linux-kernel-security-issue-that-could-lead-to-stolen-ssh-keys/
---
Tech      
      Home
    
      Tech
    
      Security
       
    The 4th Linux kernel flaw this month can lead to stolen SSH host keys
     
    The good news is there's already a patch. The bad news is that the fix isn't available for all Linux distributions yet. Here's what you can do in the meantime.
      Written by 
            Steven Vaughan-Nichols, Senior Contributing EditorSenior Contributing Editor  May 15, 2026 at 1:41 p.m. PT                           ismagilov/iStock/Getty Images PlusFollow ZDNET: Add us as a preferred source on Google.ZDNET's key takeawaysAnother day, another Linux bug. There is a patch out now.  However, it's not available yet in most distros. Linux's latest kernel flaw doesn't have a fancy name; it's just called "ssh‑keysign‑pwn." It's the fourth high‑profile local security hole to hit Linux in just a few weeks. This one enables ordinary users to quietly read some of the most sensitive files on a system, including Secure Shell (SSH) host private keys and the shadow password file.The vulnerability gets its "ssh‑keysign‑pwn" nickname from one of the main exploitation paths: abusing OpenSSH's ssh-keysign helper binary. Keysign -keysign is used for host‑based authentication and typically runs setuid root, opening the system's SSH host keys before dropping privileges to complete its work.Also: The third major Linux kernel flaw in two weeks has been found - thanks to AIJust what we needed. Another annoying and potentially dangerous Linux bug.The flaw explainedSecurity researchers at security company Qualys disclosed CVE‑2026‑46333, an information‑disclosure vulnerability in the Linux kernel's ptrace access check. Qualys claims it has existed in one form or another for about six years. The flaw sits in the __ptrace_may_access() logic that runs as processes exit. Under certain conditions, the kernel skips normal "dumpable" checks once a process has dropped its memory mapping. This opens a brief window for another process to steal its fi
