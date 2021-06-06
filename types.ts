type OnlyBoolsAndHorses = {
  [key: string]: boolean | string;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false
}

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};


type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};


type Item = OptionsFlags<FeatureFlags>

type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type MutableAccount = CreateMutable<LockedAccount>

type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};


type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>

type Getters<Type> = {
  [Property in keyof Type as `get${ Capitalize<string & Property> }`]: () => Type[Property]
};

type User2 = Getters<User>


type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, 'kind'>]: Type[Property]
};


type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: 'incrementing' };
  name: { type: string; pii: true };
};

type DBF = ExtractPII<DBFields>
