// store.ts
import create from "zustand";

interface StoreState {
  img: string;
  file: string;
  id: string;
  name: string | undefined;
  brief: string | undefined;
  show: boolean;
  show2: boolean;
  privatee: boolean;
  nile: boolean;
  packagee: boolean;
  destinations: Array<string>;
  included: Array<string>;
  excluded: Array<string>;

  duration: number;
  // shape: boolean;
  // data:
  // updateData: (
  //   e: Array<{ id: string; name: string; userId: string; Stocks: any[] }> | []
  // ) => void;
  // overlay: number;
  // updateSahpe: () => void;
  updateImg: (img: string) => void;
  setName: (name: string) => void;
  setId: (id: string) => void;

  setBrief: (brief: string) => void;
  setPrivate: (data: boolean) => void;
  setShow: (data: boolean) => void;
  setShow2: (data: boolean) => void;

  setFile: (data: string) => void;
  setNile: (data: boolean) => void;
  setPackage: (data: boolean) => void;
  setDestinations: (destinations: Array<string>) => void;
  setIncluded: (included: Array<string>) => void;
  setExcluded: (excluded: Array<string>) => void;

  setDuration: (duration: number) => void;
  // setTap: (now: number) => void;
  // increment: () => void;
  // decrement: () => void;
}

const TripStore = create<StoreState>((set) => ({
  img: "",
  name: "",
  brief: "",
  file: "",
  id: "",
  privatee: false,
  nile: false,
  show: false,
  show2: false,
  packagee: false,
  destinations: [],
  included: [],
  excluded: [],

  duration: 0,
  updateImg: (img) => set(() => ({ img })),
  setName: (name) => set({ name }),
  setBrief: (brief) => set({ brief }),
  setShow: (data) => set({ show: data }),
  setId: (data) => set({ id: data }),

  setShow2: (data) => set({ show2: data }),
  setPrivate: (data) => set({ privatee: data }),
  setNile: (data) => set({ nile: data }),
  setFile: (data) => set({ file: data }),

  setPackage: (data) => set({ packagee: data }),
  setDestinations: (destinations) => set({ destinations }),
  setIncluded: (data) => set({ included: data }),
  setExcluded: (data) => set({ excluded: data }),

  setDuration: (duration) => set({ duration }),

  // tap: 0,
  // shape: true,
  // data: [],
  // overlay: 0,
  // updateData: (e) => set(() => ({ data: e })),
  // updateOverlay: (now: number) => set(() => ({ overlay: now })),
  // updateSahpe: () => set((state) => ({ shape: !state.shape })),
  // increment: () => set((state) => ({ tap: state.tap + 1 })),
  // setTap: (now) => set(() => ({ tap: now })),
  // decrement: () => set((state) => ({ tap: state.tap - 1 })),
}));

export default TripStore;
