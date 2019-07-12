### Download
- Download the repository and Unzip it.
- Unzip "feed-formatter.zip".

### Steps

```sh
$ cd feed-formatter
$ npm i -g typescript tsc
$ npm install
$ node run dev
```

## Add new Rules (Format Specifier)
### Add each rule one by one, Bulk add is not integrated
```json
POST localhost:8081/postformat
{
    "type": "Entity",
    "openingTag": "<strong>",
    "closingTag": "</strong>"
}

POST localhost:8081/postformat
{
    "type": "Link",
    "openingTag": "<a href=\"<placeholder>\">",
    "closingTag": "</a>"
}

POST localhost:8081/postformat
{
    "type": "Twitter_username",
    "openingTag": "<a href=\"http://twitter.com/<placeholder>\">",
    "closingTag": "</a>"
}
```

## Get Formatted Text by passing Outputs of Module 1 and Module 2.

### Sample Input :
``` json
{
	"moduleOutput1": "Obama visited Facebook headquarters: http://bit.ly/xyz @elversatile",
	"moduleOutput2": [{
		"start": "14",
		"end": "22",
		"type": "Entity" 
	},
	{
		"start": "0",
		"end": "5",
		"type": "Entity" 
	},
	{
		"start": "56",
		"end": "67",
		"type": "Twitter_username" 
	},
	{
		"start": "37",
		"end": "54",
		"type": "Link" 
	}
	]
}
```
### Sample Output
``` json
<strong>Obama</strong> visited
<strong>Facebook</strong> headquarters:
<a href="http://bit.ly/xyz">http://bit.ly/xyz</a> @
<a href="http://twitter.com/elversatile">elversatile</a>
```

## Technology

- TypeScript for Backend Node.js.
