from django.contrib import admin
from .models import Artist, Artwork, Bid, Item, BiddingHistory

admin.site.register(Artist)
admin.site.register(Artwork)
admin.site.register(Bid)
admin.site.register(Item)
admin.site.register(BiddingHistory)
