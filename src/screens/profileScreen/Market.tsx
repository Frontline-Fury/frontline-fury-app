import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  
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
import styles from '../../styles/MarketStyle'; // Update path as needed
// Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: any; 
  category: string;
  description: string;
  inStock: boolean;
  rating?: number;
}

// Filter types
type SortOption = 'priceHighToLow' | 'priceLowToHigh' | 'nameAZ' | 'nameZA';
type CategoryOption = 'all' | 'merch' | 'gear' | 'collectibles';

const MarketScreen: React.FC = () => {

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



export default MarketScreen;