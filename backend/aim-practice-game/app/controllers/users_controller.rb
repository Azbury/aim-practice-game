class UsersController < ApplicationController
    def create
        render json: User.create(username: params[:username]), status: :created
    end

    private

    def user_params
        params.require(:user).permit(:username)
    end
end