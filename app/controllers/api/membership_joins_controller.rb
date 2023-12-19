class Api::MembershipJoinsController < ApplicationController
    def create 
        @membership_join = MembershipJoin.new(membership_join_params);
        if @membership_join.save
            render :show
        else
            render json: {errors: @membership_join.errors.full_messages}
        end
    end

    private
    def membership_join_params
        params.require(:membership_join).permit(:user_id, :membership_type, :membership_id)
    end
end