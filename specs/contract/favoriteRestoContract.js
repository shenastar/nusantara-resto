const itActsAsFavoriteRestoModel = (favoriteresto) => {
    it('should return the resto that has been added', async () => {
      favoriteresto.putResto({ id: 1 });
      favoriteresto.putResto({ id: 2 });
  
      expect(await favoriteresto.getResto(1))
        .toEqual({ id: 1 });
      expect(await favoriteresto.getResto(2))
        .toEqual({ id: 2 });
      expect(await favoriteresto.getResto(3))
        .toEqual(undefined);
    });
  
    it('should refuse a resto from being added if it does not have the correct property', async () => {
      favoriteresto.putResto({ aProperty: 'property' });
  
      expect(await favoriteresto.getAllResto())
        .toEqual([]);
    });
  
    it('can return all of the resto that have been added', async () => {
      favoriteresto.putResto({ id: 1 });
      favoriteresto.putResto({ id: 2 });
  
      expect(await favoriteresto.getAllResto())
        .toEqual([
          { id: 1 },
          { id: 2 },
        ]);
    });
  
    it('should remove favorite resto', async () => {
      favoriteresto.putResto({ id: 1 });
      favoriteresto.putResto({ id: 2 });
      favoriteresto.putResto({ id: 3 });
  
      await favoriteresto.deleteResto(1);
  
      expect(await favoriteresto.getAllResto())
        .toEqual([
          { id: 2 },
          { id: 3 },
        ]);
    });
  
    it('should handle request to remove a resto even though the resto has not been added', async () => {
      favoriteresto.putResto({ id: 1 });
      favoriteresto.putResto({ id: 2 });
      favoriteresto.putResto({ id: 3 });
  
      await favoriteresto.deleteResto(4);
  
      expect(await favoriteresto.getAllResto())
        .toEqual([
          { id: 1 },
          { id: 2 },
          { id: 3 },
        ]);
    });
  };
  
  export { itActsAsFavoriteRestoModel };