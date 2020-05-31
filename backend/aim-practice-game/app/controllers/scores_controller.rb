class ScoresController < ApplicationController
    def create
        render json: Score.create(points: params[:points], user_id: params[:user_id])
    end

    private

    def score_params
        params.require(:score).permit(:points, :user_id)
    end
end