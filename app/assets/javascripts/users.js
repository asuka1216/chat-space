$(function() {
  function addUser(user) { //引数に値が入っていた場合の変数定義
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() { //引数に値が入っていない場合の変数定義
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() { //#user-search-fieldは検索入力のタグ keyup=>テキストフィールドに文字が入力されるたびにイベントを発火させるメソッド
    let input = $("#user-search-field").val(); //valメソッドでフォームの値を取得する 取得した値(テキストフィールドに入力されたテキスト)を変数inputに代入
    $.ajax({
      type: "GET", //HTTPメソッド
      url: "/users", //リクエストの送信先(/users)
      data: { keyword: input }, //テキストフィールドに入力された文字(input)
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user); //変数呼び出し
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser(); //変数呼び出し
        }
      })
      .fail(function() { //通信失敗
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});