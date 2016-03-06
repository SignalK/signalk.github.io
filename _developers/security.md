---
title: Security
layout: developers
developers: active
id: se
---

## {{page.title}}

### The Need for Security

In legacy marine systems, especially recreational systems, there was no concept of data security. It wasn't necessary as
the systems were designed to be stand-alone on-board systems, with very limited communication to the outside world. The
further assumption was that access would be managed physically on commercial vessels, and crew could be trusted on
recreational vessels.

With Signal K we are potentially connecting the vessel to the world, via the internet, and access to and by external
services is the norm. Suddenly the issue of security becomes important, not just to protect privacy, but also to ensure
the safety of crew and vessel.

The goals of the security definition are:

* to validate all messages arriving and departing in a similar way to a network firewall
* to provide a configurable filter implementation that will work for all Signal K messages, current and future
* provide a security layer that is independent of Signal K applications, so that applications need minimal knowledge of
  security
* be software agnostic but rule compatible to allow implementations on different servers/devices.

### Security Model

The security model is provided by a filter mechanism similar to the Linux
[iptables](http://www.netfilter.org/projects/iptables/index.html) firewall. All messages arriving at the Signal K device
should go through an INCOMING filter chain, and all messages leaving should go through an OUTGOING filter chain. The
filter will have the option of:

Based on (source, destination, user)

* ALLOW the message to continue
* DENY the message, sending a denial message back
* DROP the message, ignoring the data
* SECURE - encrypt or decrypt the message contents (SSL transport can be specified by the source/destination URL, and
  is done in the normal web way)
* JUMP - pass the message through another filter chain

Based on the message contents:

* FILTER_ALLOW - allow the Signal K branch/leaf to continue
* FILTER_DENY - remove the Signal K branch/leaf
* FILTER_READONLY - allow the branch/leaf to continue, but annotated with a read-only flag

It will be possible to specify additional custom chains (as per iptables) to make complex routing possible. When an app
is installed it can provide a set of rules, and (with permission) these will be added into the current rule base.

The reference server will have a default set of rules - and it may be that some rules are 'fixed'. Otherwise a user can
configure permissions by adjusting rules. This implies a Signal K server implementation provides a GUI to simplify some
quite complex concepts for the average user.

App developers can provide rulesets to suit their needs, and hence provide for their own needs, for example encrypting
contents to an ActiveCaptain private blog or such.

#### Default permissions

As per good security practice the default security setting will be to limit external (off boat) messages severely,
allowing only such data as will already be available externally. There are different security scopes within the vessel
and these will have different default permissions.

Sources on the boat, that are as secure as current systems:

* serial cables - ALLOW - trusted by default
* usb devices local to the server, e.g. plugged into the servers USB hub -  ALLOW - trusted by default
* ethernet -  ALLOW - trusted by default
* CANbus and misc local wiring - ALLOW -  trusted by default

New systems that are potentially insecure:

* local WIFI - ALLOW - trusted by default when using WPA access and encryption control
* public WIFI - DROP - untrusted - assume that the client is off-boat. (Both access points are on-board, but this one is
  for public connection to the boat)
* other external sources, e.g. satellite, GPRS, cellphone data - DROP - untrusted

#### Implementation

The security implementation is up to the Signal K device or server to implement.  Most sensor level devices will not
have the capacity to provide security, and will depend on an upstream server to do this. This is similar to normal
security practice using firewalls and bastion hosts.

The implementation should ensure that access to the security rules configuration is tightly controlled, and not
compromised by plugins and other potentially dangerous code. Likewise the implementation should ensure that the first
rule chain for incoming messages is always INCOMING, and the last for outgoing messages is always OUTGOING. Branching to
custom chains and the potential effects should be carefully considered.
