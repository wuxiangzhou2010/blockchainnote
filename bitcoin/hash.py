import hashlib
md5Hash = hashlib.md5()
md5Hash.update('THis is a sample ha h'.encode('utf-8'))
print(md5Hash.hexdigest())

md5Hash.update('very long bits of data'.encode('utf-8'))
print(md5Hash.hexdigest())
md5Hash.update('very long bits of date'.encode('utf-8'))
print(md5Hash.hexdigest())
