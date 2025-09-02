import { http, HttpResponse } from "msw";

export const handlers = [
  http.post('/api/users/register',async ({ request }) => {
    request.json().then(data => {
      console.log(data)
    })
    return HttpResponse.json({
      "code": 1,
      "msg": "注册成功",
      "data": null
    })
  })
]