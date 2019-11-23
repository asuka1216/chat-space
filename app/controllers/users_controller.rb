class UsersController < ApplicationController
  def index
    return nil if params[:keyword] == "" #params[:keyword]に値が入っていればそのまま処理が続き,空だった場合はそこで処理が終了
    @users = User.where(['name LIkE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10) #whereメソッドを使用し,入力された値を含むかつ,ログインしているユーザーのidは除外する条件で検索処理を行う
    respond_to do |format| #フォーマットの返し方を条件分岐
      format.html #フォーマットをhtmlで返す
      format.json #フォーマットをjsonで返す=>jbuilderファイルが読み込まれる
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end