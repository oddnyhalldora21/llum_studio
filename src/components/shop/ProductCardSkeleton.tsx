function ProductCardSkeleton() {
    return (
      <div>
        <div
          className="mb-3 animate-pulse"
          style={{
            aspectRatio: '3/4',
            backgroundColor: '#e0d5cc',
            borderRadius: '2px',
          }}
        />
        <div
          className="animate-pulse mb-1.5"
          style={{ height: '12px', width: '60%', backgroundColor: '#e0d5cc', borderRadius: '2px' }}
        />
        <div
          className="animate-pulse"
          style={{ height: '12px', width: '40%', backgroundColor: '#ebe3dc', borderRadius: '2px' }}
        />
      </div>
    )
  }
  
  export default ProductCardSkeleton