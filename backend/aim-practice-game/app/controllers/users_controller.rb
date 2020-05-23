class UsersController < ApplicationController
    def create
        respond_with User.create(username: params[:username])
    end

    private

    def user_params
        params.require(:user).permit(:username)
    end
end