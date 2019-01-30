## Readme

### Example1

#### User

```shell
> { foo: "bar" }
```

#### Front -> Server

```json
{
  "lang": "javascript",
  "data": "{ foo: \"bar\" }"
}
```

#### Server -> Front

```json
{
  "type": "object",
  "stdout": "",
  "data": [
    {
      "key": "foo",
      "value": "\"bar\""
    }
  ]
}
```

### Example2

#### User

```shell
> () => {
    console.log("hello");
    return 7;
}
```

#### Front -> Server

```json
{
  "lang": "javascript",
  "data": "() => { console.log(\"hello\"); return 7; }"
}
```

#### Server -> Front

```json
{
  "type": "primitive",
  "stdout": "hello",
  "data": "7"
}
```
