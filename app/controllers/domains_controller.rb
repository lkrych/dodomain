class  DomainsController < ApplicationController
  before_action :authenticate_request!
  def index
    begin
      #handle sorting and searching on the index method
      @search_query = index_params[:search_query] || ''
      @page = index_params[:page] ||= 1
        
      offset = @page.to_i - 1
      @desc = index_params[:desc] == Constants::FALSE ? false : true
      @order_by = index_params[:order_by] ||= :id
      ordering = @order_by.to_s + ' ' + (@desc ? Constants::DESC : Constants::ASC)
      domains = Domain.search(@search_query)
      count = domains.size
      @total = count % 50 == 0 ? count / 50 : count / 50 + 1
      @domains = domains.order(ordering).limit(50).offset(offset * 50)

      render :json => {
        domains: @domains,
        pagination: {
          totalPages: @total,
          page: @page,
          search_query: @search_query,
          desc: @desc,
          order_by: @order_by
        }
      }
    rescue => e
      puts e, e.backtrace
      logger.error "###############"
      logger.error "The backtrace for the domains_controller error: #{e} is \n #{e.backtrace}"
      logger.error "###############"
      render json: {domain_errors: 'An error occurred retrieving your data.'}, status: :bad_request
    end
  end

  def create
    begin
      d = Domain.new(domain_params)
      d.user_id = @current_user.id
      d.parse_domain
      d.check_if_valid_domain
      d.save!
      render json: {message: "Domain successfully saved!"}, status: :ok
    rescue => e
      puts e, e.backtrace
      logger.error "###############"
      logger.error "The backtrace for the domains_controller error: #{e} is \n #{e.backtrace}"
      logger.error "###############"
      render json: {domain_errors: "An error occurred saving your domain: #{e}"}, status: :bad_request
    end
  end

  private
  def domain_params
    params.require(:domain).permit(:description, :name)
  end

  def index_params
    params.permit(:search_query, :page, :desc, :order_by)
  end
end
