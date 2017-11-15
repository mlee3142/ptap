import boto 


MKTURK_PUBLIC_DIRECTORY_PATH = '../ptap/public/'
MKTURK_LANDINGPAGES_DIRECTORY_PATH = '../ptap/landingPages/'
split_start = '/ptap' # references above

# Upload to s3 monkeyturksandbox
from boto.s3.key import Key
import sys 
from time import ctime 
import numpy as np

def upload_public_to_sandbox():

    bucket_name = 'ptapmechanicalturk'
    conn = boto.connect_s3()
    bucket = conn.get_bucket(bucket_name)
    k = Key(bucket)

    import os

    for root, subdir, files in os.walk(MKTURK_PUBLIC_DIRECTORY_PATH): 
        for fname in files: 
            if fname.startswith('.DS'): 
                continue
            fpath = os.path.join(root,fname)
            fkey = fpath.split(split_start)[1]
            k.key = fkey 
            k.set_contents_from_filename(fpath)
            print 'Uploaded %s'%fkey
            k.set_acl('public-read')

    
            
if __name__ == '__main__': 
    print 'hello'
    upload_public_to_sandbox()
