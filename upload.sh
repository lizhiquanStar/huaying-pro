#!/usr/bin/expect

# windows需先配置git bash
# @see https://segmentfault.com/a/1190000008185938
set user administrator
set pass Gakm316123
set dir D:/项目发布文件夹/OA/publish/wwwroot
set ip 115.236.67.13

proc getScriptDirectory {} {
    set dispScriptFile [file normalize [info script]]
    set scriptFolder [file dirname $dispScriptFile]
    return $scriptFolder
}

set pwd [getScriptDirectory]
 
# scp upload
spawn bash -c "scp -r ${pwd}/dist/* ${user}@${ip}:${dir}" # 直接scp不能识别*
expect "${user}@${ip}'s password:"
send "${pass}\r"
interact