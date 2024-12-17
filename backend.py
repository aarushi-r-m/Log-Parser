import json
from flask import Flask, jsonify

data = []

def log_extraction(words):
    for i in range(len(words)):
        json = {'timestamp':"" , "log_severity":" ", "node_name": " ", "message_content": " "}
        word = words[i]
        if i == 0:
            json['timestamp'] = word[1:]
        if i == 1:
            json['log_severity'] = word[2:]
        if i ==2:
            json['node_name'] = word[3:]
        if i==3:
            pre_message = word[1:]
            json['message_content'] =pre_message[:-2]
        data.append(json)
            
            
with open('fake_ros_logs.log', 'r') as file:
    for line in file:
        words = line.split(']')
        log_extraction(words)

app = Flask(__name__)
@app.route('/get-array', methods=['GET'])
def send_array():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)