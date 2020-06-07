!/usr/bin/env python
2	
3	
4	"""This is a blind proxy that we use to get around browser
5	restrictions that prevent the Javascript from loading pages not on the
6	same server as the Javascript.  This has several problems: it's less
7	efficient, it might break some sites, and it's a security risk because
8	people can use this proxy to browse the web and possibly do bad stuff
9	with it.  It only loads pages via http and https, but it can load any
10	content type. It supports GET and POST requests."""
11	
12	import urllib2
13	import cgi
14	import sys, os
15	
16	# Designed to prevent Open Proxy type stuff.
17	
18	allowedHosts = ['localhost', 'localhost:8080',
                    'www.openlayers.org', 'openlayers.org', 
19	                'labs.metacarta.com', 'world.freemap.in', 
20	                'prototype.openmnnd.org', 'geo.openplans.org',
21	                'sigma.openplans.org', 'demo.opengeo.org',
22	                'www.openstreetmap.org', 'sample.azavea.com',
23	                'v2.suite.opengeo.org', 'v-swe.uni-muenster.de:8080', 
24	                'vmap0.tiles.osgeo.org', 'www.openrouteservice.org']
25	
26	method = os.environ["REQUEST_METHOD"]
27	
28	if method == "POST":
29	    qs = os.environ["QUERY_STRING"]
30	    d = cgi.parse_qs(qs)
31	    if d.has_key("url"):
32	        url = d["url"][0]
33	    else:
34	        url = "http://www.openlayers.org"
35	else:
36	    fs = cgi.FieldStorage()
37	    url = fs.getvalue('url', "http://www.openlayers.org")
38	
39	try:
40	    host = url.split("/")[2]
41	    if allowedHosts and not host in allowedHosts:
42	        print "Status: 502 Bad Gateway"
43	        print "Content-Type: text/plain"
44	        print
45	        print "This proxy does not allow you to access that location (%s)." % (host,)
46	        print
47	        print os.environ
48	 
49	    elif url.startswith("http://") or url.startswith("https://"):
50	   
51	        if method == "POST":
52	            length = int(os.environ["CONTENT_LENGTH"])
53	            headers = {"Content-Type": os.environ["CONTENT_TYPE"]}
54	            body = sys.stdin.read(length)
55	            r = urllib2.Request(url, body, headers)
56	            y = urllib2.urlopen(r)
57	        else:
58	            y = urllib2.urlopen(url)
59	       
60	        # print content type header
61	        i = y.info()
62	        if i.has_key("Content-Type"):
63	            print "Content-Type: %s" % (i["Content-Type"])
64	        else:
65	            print "Content-Type: text/plain"
66	        print
67	       
68	        print y.read()
69	       
70	        y.close()
71	    else:
72	        print "Content-Type: text/plain"
73	        print
74	        print "Illegal request."
75	
76	except Exception, E:
77	    print "Status: 500 Unexpected Error"
78	    print "Content-Type: text/plain"
79	    print 
80	    print "Some unexpected error occurred. Error text was:", E