import glob
import os
from io import BytesIO

import PIL.Image
import numpy as np
import requests

from python_task_makers import config as config


def load_text(fpath):
    with open(fpath, 'r') as myfile:
        string = myfile.read()
    return string


def save_text(string:str, fpath):
    with open(fpath, 'w') as f:
        f.write(string)


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
    nchannels = img.shape[2]
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

    fpaths = glob.glob(os.path.join(common_loc, '*.js'))

    texts = []
    for js_fpath in fpaths:

        texts.append(load_text(js_fpath))

    common_string = '\n\n'.join(texts)
    return common_string