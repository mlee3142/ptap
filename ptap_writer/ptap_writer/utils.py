import glob
import os
from io import BytesIO

import PIL.Image
import numpy as np
import requests

from ptap_writer import config as config


def load_text(fpath):
    with open(fpath, 'r') as myfile:
        string = myfile.read()
    return string


def save_text(string:str, fpath):
    dirname = os.path.dirname(fpath)
    if not os.path.exists(dirname) and len(dirname) > 0:
        os.makedirs(dirname, exist_ok=False)

    with open(fpath, 'w') as f:
        f.write(string)

def check_url_exists(url:str, raise_exception:bool):

    valid = False
    try:
        request = requests.get(url)
        if request.status_code == 200:
            valid = True
    except Exception as e:
        if raise_exception:
            raise e
    return valid

def check_url_has_image(url: str):
    """
    Raises an Exception if the URL cannot be downloaded as an image.
    Returns a dict of metadata (height, width, nchannels, status)
    """
    assert isinstance(url, str)
    return_vals = {}

    response = requests.get(url)
    img = np.array(PIL.Image.open(BytesIO(response.content)))
    height = img.shape[0]
    width = img.shape[1]
    if len(img.shape) > 2:
        nchannels = img.shape[2]
    else:
        nchannels = 0
    return_vals['height'] = height
    return_vals['width'] = width
    return_vals['nchannels'] = nchannels
    return_vals['status'] = True

    return return_vals


def make_javascript_common_injection_string():
    """
    Loads all .js files at ptap/public/common into a string.
    This string can be injected into an HTML that wishes to utilize the JavaScript functions at ptap/public/common/
    :return:
    :rtype:
    """

    ptap_public_location = config.PTAP_PUBLIC_LOCATION
    common_loc = os.path.join(ptap_public_location, 'common')
    assert os.path.exists(common_loc), 'Could not find ptap/public/common at %s'%(common_loc)

    fpaths = sorted(glob.glob(os.path.join(common_loc, '*.js')))


    common_path = os.path.commonpath(fpaths)
    texts = []
    for js_fpath in fpaths:
        base_name = js_fpath.split(ptap_public_location)[-1]

        js_text = load_text(js_fpath)
        js_text = '////////// IMPORT from %s//////////\n'%(base_name) + js_text
        texts.append(js_text)

    common_string = '\n\n'.join(texts)
    return common_string

if __name__ == '__main__':
    exists = check_url_exists('https://milresources.s3.amazonaws.com/Images/Dreams/upward_downward_angle/images/class0/ResNet_v2_50_class0_batch0_im1.png', raise_exception=True)
    exists = check_url_exists('https://www.google.com', raise_exception=True)