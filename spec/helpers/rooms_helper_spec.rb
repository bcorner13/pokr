require 'rails_helper'

RSpec.describe RoomsHelper, type: :helper do
  describe "#state_class" do
    it "returns label-default if room.status is draw" do
      room = double(status: Room::DRAW)
      expect(state_class(room)).to eq "label-default"
    end

    it "returns label-info if room.status is not draw" do
      room = double(status: nil)
      expect(state_class(room)).to eq "label-info"
    end
  end

  describe "#render_point_values" do
    it "generates form input tag with different button styles for point values of rooms" do
      html = render_point_values false, %w(0 1 2 5 8 13 21), %w(1 5 13)
      expect(html).to include '<input class="btn btn-default" type="button" value="0" />'
      expect(html).to include '<input class="btn btn-info" type="button" value="1" />'
      expect(html).to include '<input class="btn btn-default" type="button" value="2" />'
      expect(html).to include '<input class="btn btn-info" type="button" value="5" />'
      expect(html).to include '<input class="btn btn-default" type="button" value="8" />'
      expect(html).to include '<input class="btn btn-info" type="button" value="13" />'
      expect(html).to include '<input class="btn btn-default" type="button" value="21" />'
    end

    it "generates form input tag with enabled button style for point values of rooms" do
      html = render_point_values true, %w(0 1 2 5 8 13 21), %w(1 5 13)
      expect(html).to include '<input class="btn btn-info" type="button" value="0" />'
      expect(html).to include '<input class="btn btn-info" type="button" value="1" />'
      expect(html).to include '<input class="btn btn-info" type="button" value="2" />'
      expect(html).to include '<input class="btn btn-info" type="button" value="5" />'
      expect(html).to include '<input class="btn btn-info" type="button" value="8" />'
      expect(html).to include '<input class="btn btn-info" type="button" value="13" />'
      expect(html).to include '<input class="btn btn-info" type="button" value="21" />'
    end
  end

  describe "#component_name" do
    it "returns Room if desktop request" do
      def is_mobile_request?; false; end
      expect(component_name).to eq "Room"
    end

    it "returns RoomMobile if desktop request" do
      def is_mobile_request?; true; end
      expect(component_name).to eq "RoomMobile"
    end
  end
end
