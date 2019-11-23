json.array! @users do |user| #array=>json形式のデータを配列で返す @usersのデータをuser配列で返す
  json.id user.id #JavaScriptファイルに返ってきた配列userのデータをjbuilderで定義したキーとバリューの形で呼び出すことができる
  json.name user.name # ゞゞゞ
end