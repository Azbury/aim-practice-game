class UserSerializer
    def initialize(user_object)
        @user = user_object
    end

    def to_serialized_json
        @user.to_json(:include => {
            :scores => {:only => [:points :id]},
        }, :except => [:updated_at, :created_at])
    end
end