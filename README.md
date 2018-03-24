# swapi
rebuilt by express

## class
### 读取:/class/read
### 写入:/class/create
@param classname, prop(a\`b\`c)

## obj
### 读取:/object/read
### 写入:/object/create
@param classname, prop(a=content_a\`b=content_b)
### 删除:/object/delete
@param classname, objectid

## list
### 读取:/list/read
@param listid, category
### 创建列表:/list/create
@param listid, category
### 添加对象:/list/add
@param listid, category, objectid
