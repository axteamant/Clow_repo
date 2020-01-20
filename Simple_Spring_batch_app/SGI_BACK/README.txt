Simple Spring boot application with rest Controller.
Use Spring Batch and have two different schedulated Job:
1) Save on a database files one per day
2) Save on a ftp server one per mouth


to make it work u have to change configuration files:

server path
antsrl-backup/getupload -> upload a file on a folder
antsrl-backup/db -> check connection
antsrl-backup/start?jobname=DBS -> start database insert (new file uploaded)
antsrl-backup/start?jobname=FTP -> start ftp insert
