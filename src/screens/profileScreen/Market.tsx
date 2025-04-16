import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: any; // Image source
  category: string;
  description: string;
  inStock: boolean;
  rating?: number;
}

// Filter types
type SortOption = 'priceHighToLow' | 'priceLowToHigh' | 'nameAZ' | 'nameZA';
type CategoryOption = 'all' | 'merch' | 'gear' | 'collectibles';

const MarketScreen: React.FC = () => {
  // Sample product data - replace with your actual products
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Game Logo T-Shirt',
      price: 24.99,
      image: require('../../../assets/t-shirt-364036.webp'),
      category: 'merch',
      description: 'Official game logo t-shirt in black, 100% cotton.',
      inStock: true,
      rating: 4.5
    },
    {
      id: '2',
      name: 'Pro Gaming Headset',
      price: 89.99,
      image: require('../../../assets/ff.png'),
      category: 'gear',
      description: 'Professional gaming headset with noise cancellation.',
      inStock: true,
      rating: 4.8
    },
    {
      id: '3',
      name: 'Character Figurine',
      price: 39.99,
      image: require('../../../assets/Guvpev-Jujutsu-Kaisen-Figure-5-6-Sitting-Gojo-Satoru-Geto-Suguru-Anime-Figures-PVC-Model-Statue-Jujutsu-Kaisen-Collectible-Figures-JJK-Figure-Toys-De_ccacdf82-f42f-46d8-9399-d0e59fd6cf5d.3278186eae019b4a35711ea12c56d0.webp'),
      category: 'collectibles',
      description: 'Limited edition collectible figurine of the main character.',
      inStock: false,
      rating: 4.9
    },
    {
      id: '4',
      name: 'Gaming Mouse',
      price: 59.99,
      image: require('../../../assets/ff.png'),
      category: 'gear',
      description: 'High precision gaming mouse with customizable buttons.',
      inStock: true,
      rating: 4.7
    },
    {
      id: '5',
      name: 'Game Soundtrack Vinyl',
      price: 34.99,
      image: require('../../../assets/akira1_1024x1024.webp'),
      category: 'collectibles',
      description: 'Original game soundtrack on premium vinyl.',
      inStock: true,
      rating: 4.6
    },
    {
      id: '6',
      name: 'Hoodie with Game Logo',
      price: 49.99,
      image: require('../../../assets/6_057c9db4-3abd-4525-9dac-7921240e8baa.webp'),
      category: 'merch',
      description: 'Comfortable hoodie featuring the game logo, perfect for gaming sessions.',
      inStock: true,
      rating: 4.4
    },
  ]);

  // State for filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('nameAZ');
  const [categoryFilter, setCategoryFilter] = useState<CategoryOption>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'priceHighToLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'priceLowToHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'nameAZ':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZA':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    
    setFilteredProducts(result);
  }, [products, sortBy, categoryFilter, searchQuery]);

  // Handle product selection
  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Render product card
  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => handleProductPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.productImageContainer}>
        <Image source={item.image} style={styles.productImage} />
        {!item.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= Math.floor(item.rating || 0) ? "star" : star <= (item.rating || 0) ? "star-half" : "star-outline"}
              size={12}
              color="#FFD700"
              style={styles.starIcon}
            />
          ))}
        </View>
        <TouchableOpacity 
          style={[styles.addToCartButton, !item.inStock && styles.disabledButton]}
          disabled={!item.inStock}
        >
          <Text style={styles.addToCartText}>
            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Category label mapping
  const getCategoryLabel = (category: CategoryOption): string => {
    switch(category) {
      case 'all': return 'All Products';
      case 'merch': return 'Merchandise';
      case 'gear': return 'Gaming Gear';
      case 'collectibles': return 'Collectibles';
      default: return 'All Products';
    }
  };

  // Sort option label mapping
  const getSortLabel = (sort: SortOption): string => {
    switch(sort) {
      case 'priceHighToLow': return 'Price: High to Low';
      case 'priceLowToHigh': return 'Price: Low to High';
      case 'nameAZ': return 'Name: A to Z';
      case 'nameZA': return 'Name: Z to A';
      default: return 'Price: High to Low';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Market</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      {/* Filter and Sort Controls */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="filter" size={18} color="#555" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons name="swap-vertical" size={18} color="#555" />
          <Text style={styles.sortButtonText}>{getSortLabel(sortBy)}</Text>
        </TouchableOpacity>
      </View>
      
      {/* Category Pills */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContentContainer}
      >
        {(['all', 'merch', 'gear', 'collectibles'] as CategoryOption[]).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryPill,
              categoryFilter === category && styles.categoryPillActive
            ]}
            onPress={() => setCategoryFilter(category)}
          >
            <Text style={[
              styles.categoryPillText,
              categoryFilter === category && styles.categoryPillTextActive
            ]}>
              {getCategoryLabel(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Results count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </Text>
      </View>
      
      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={50} color="#ccc" />
            <Text style={styles.emptyStateText}>No products found</Text>
            <Text style={styles.emptyStateSubtext}>Try adjusting your filters</Text>
          </View>
        }
      />
      
      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Products</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSectionTitle}>Categories</Text>
            {(['all', 'merch', 'gear', 'collectibles'] as CategoryOption[]).map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.modalOption}
                onPress={() => {
                  setCategoryFilter(category);
                  setShowFilterModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{getCategoryLabel(category)}</Text>
                {categoryFilter === category && (
                  <Ionicons name="checkmark-circle" size={24} color="#5065CB" />
                )}
              </TouchableOpacity>
            ))}
            
            <Text style={styles.modalSectionTitle}>Availability</Text>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>In Stock Only</Text>
              <Ionicons name="square-outline" size={24} color="#999" />
            </TouchableOpacity>
            
            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => {
                  setCategoryFilter('all');
                  setShowFilterModal(false);
                }}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            {(['priceHighToLow', 'priceLowToHigh', 'nameAZ', 'nameZA'] as SortOption[]).map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => {
                  setSortBy(option);
                  setShowSortModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{getSortLabel(option)}</Text>
                {sortBy === option && (
                  <Ionicons name="checkmark-circle" size={24} color="#5065CB" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <Modal
          visible={showProductModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            setShowProductModal(false);
            setSelectedProduct(null);
          }}
        >
          <View style={styles.productModalOverlay}>
            <View style={styles.productModalContent}>
              <TouchableOpacity 
                style={styles.closeProductButton}
                onPress={() => {
                  setShowProductModal(false);
                  setSelectedProduct(null);
                }}
              >
                <Ionicons name="close-circle" size={32} color="#fff" />
              </TouchableOpacity>
              
              <Image source={selectedProduct.image} style={styles.productModalImage} />
              
              <View style={styles.productModalInfo}>
                <Text style={styles.productModalName}>{selectedProduct.name}</Text>
                <Text style={styles.productModalPrice}>${selectedProduct.price.toFixed(2)}</Text>
                
                <View style={styles.productModalRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= Math.floor(selectedProduct.rating || 0) ? "star" : star <= (selectedProduct.rating || 0) ? "star-half" : "star-outline"}
                      size={16}
                      color="#FFD700"
                      style={styles.starIcon}
                    />
                  ))}
                  <Text style={styles.ratingText}>
                    {selectedProduct.rating?.toFixed(1)} / 5.0
                  </Text>
                </View>
                
                <Text style={styles.productModalCategory}>
                  Category: {getCategoryLabel(selectedProduct.category as CategoryOption)}
                </Text>
                
                <Text style={styles.productModalDescription}>
                  {selectedProduct.description}
                </Text>
                
                <View style={styles.productModalButtons}>
                  <TouchableOpacity style={styles.wishlistButton}>
                    <Ionicons name="heart-outline" size={20} color="#5065CB" />
                    <Text style={styles.wishlistButtonText}>Wishlist</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.buyButton,
                      !selectedProduct.inStock && styles.disabledBuyButton
                    ]}
                    disabled={!selectedProduct.inStock}
                  >
                    <Text style={styles.buyButtonText}>
                      {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 5,
    marginLeft: 15,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sortButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  categoryContentContainer: {
    paddingHorizontal: 15,
  },
  categoryPill: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  categoryPillActive: {
    backgroundColor: '#5065CB',
  },
  categoryPillText: {
    fontSize: 14,
    color: '#555',
  },
  categoryPillTextActive: {
    color: '#fff',
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  resultsText: {
    fontSize: 14,
    color: '#777',
  },
  productGrid: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5065CB',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  starIcon: {
    marginRight: 2,
  },
  addToCartButton: {
    backgroundColor: '#5065CB',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyState: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  resetButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#555',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#5065CB',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  productModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  productModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '85%',
  },
  closeProductButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  productModalImage: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
  },
  productModalInfo: {
    padding: 20,
  },
  productModalName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  productModalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5065CB',
    marginBottom: 12,
  },
  productModalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  productModalCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  productModalDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 24,
  },
  productModalButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  wishlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#5065CB',
    borderRadius: 10,
    marginRight: 10,
  },
  wishlistButtonText: {
    marginLeft: 8,
    color: '#5065CB',
    fontWeight: '600',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#5065CB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledBuyButton: {
    backgroundColor: '#ccc',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default MarketScreen;