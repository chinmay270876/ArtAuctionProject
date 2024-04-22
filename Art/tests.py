from django.test import TestCase
from datetime import date
from .models import Artist, Artwork, Bid, MyModel, Item, BiddingHistory
from django.contrib.auth.models import User


class ArtistModelTestCase(TestCase):
    def setUp(self):
        self.artist = Artist.objects.create(name="Test Artist", bio="Test bio", birth_date=date(1990, 1, 1),
                                            nationality="Test nationality")

    def test_artist_creation(self):
        self.assertEqual(self.artist.name, "Test Artist")
        self.assertEqual(self.artist.bio, "Test bio")
        self.assertEqual(self.artist.birth_date.strftime("%Y-%m-%d"), "1990-01-01")
        self.assertEqual(self.artist.nationality, "Test nationality")

    def test_artist_string_representation(self):
        self.assertEqual(str(self.artist), "Test Artist")


class ArtworkModelTestCase(TestCase):
    def setUp(self):
        self.artwork = Artwork.objects.create(title="Test Artwork", description="Test description", price=100.00)

    def test_artwork_creation(self):
        self.assertEqual(self.artwork.title, "Test Artwork")
        self.assertEqual(self.artwork.description, "Test description")
        self.assertEqual(self.artwork.price, 100.00)

    def test_artwork_string_representation(self):
        self.assertEqual(str(self.artwork), "Test Artwork")


class BidModelTestCase(TestCase):
    def setUp(self):
        self.artist = Artist.objects.create(name="Test Artist")
        self.artwork = Artwork.objects.create(title="Test Artwork", description="Test description", price=100.00)
        self.bid = Bid.objects.create(bidder_name="Test Bidder", bid_amount=150.00, artwork=self.artwork)

    def test_bid_creation(self):
        self.assertEqual(self.bid.bidder_name, "Test Bidder")
        self.assertEqual(self.bid.bid_amount, 150.00)
        self.assertEqual(self.bid.artwork, self.artwork)

    def test_bid_string_representation(self):
        self.assertEqual(self.bid.bidder_name, "Test Bidder")


class MyModelTestCase(TestCase):
    def setUp(self):
        self.my_model = MyModel.objects.create(field1="Test Field", field2=123)

    def test_my_model_creation(self):
        self.assertEqual(self.my_model.field1, "Test Field")
        self.assertEqual(self.my_model.field2, 123)

    def test_my_model_string_representation(self):
        self.assertEqual(str(self.my_model), "Test Field")


class ItemModelTestCase(TestCase):
    def setUp(self):
        self.item = Item.objects.create(name="Test Item", description="Test description")

    def test_item_creation(self):
        self.assertEqual(self.item.name, "Test Item")
        self.assertEqual(self.item.description, "Test description")

    def test_item_string_representation(self):
        self.assertEqual(str(self.item), "Test Item")


class BiddingHistoryModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", email="test@example.com", password="password")
        self.item = Item.objects.create(name="Test Item", description="Test description")
        self.bidding_history = BiddingHistory.objects.create(user=self.user, item=self.item, bid_amount=200.00)

    def test_bidding_history_string_representation(self):
        expected_string = f"Bidding history: {self.user.username} bid {self.bidding_history.bid_amount:.1f} on {self.item.name}"
        self.assertEqual(str(self.bidding_history), expected_string)
