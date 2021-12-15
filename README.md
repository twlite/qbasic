# QBasic.js

QBasic.js allows you to use **[qb.js](https://github.com/smhanov/qb.js)** inside node projects.

# Example

## CLI

```sh
$ npx qbasic --source=filePath.bas
```

`index.js`
```js
const { compileFile } = require("qbasic");
const fs = require("fs");

const { bytecode } = compileFile("./demo.bas");
fs.writeFileSync("./bytecode.txt", bytecode);
```

`demo.bas`

```basic
CLS
PRINT "Hello from QBasic"
END
```

`bytecode.txt`

```txt
   ' L1 CLS
syscall CLS
   ' L2 PRINT "Hello from QBasic"
pushconst Hello from QBasic
syscall print
pushconst 

syscall print
   ' L3 END
end
ret
end
```