import React, { useState, useEffect, useContext } from 'react';
import { Container, Head, GraphContainer, GraphContainerHeader, Selector, Option, Selection, Icon, Display } from '../dataStyles';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import CodeTime from '../../components/CodeTime';
import VerticalBarGraph from '../../components/VerticalBarGraph'
import { get_total_time } from '../../utils/functions';
import { ReactContext } from '../../context/context';
import { Redirect } from 'react-router';

const Monthly = () => {
  const state = useContext(ReactContext);
  const [monthno, setMonthno] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState();
  const [days, setDays] = useState([]);


  useEffect(() => {
    if (state.days && state.days.days)
      setDays(state.days.days);
    setUser(state.user);
  }, [state]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNames_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let created_at;
  let currmonth;
  let total_time;
  if (days && user) {
    created_at = new Date(user.created_at).getFullYear();
    currmonth = days.filter((item) => new Date(item.date).getMonth() === monthno && new Date(item.date).getFullYear() === year);
    total_time = get_total_time(currmonth);
  }

  const MonthOptions = () => {
    let monthsOptions = [];
    for (let i = 0; i < 12; i++) {
      monthsOptions.push(<Option value={i} key={i}>{monthNames_short[i]}</Option>)
    }
    return monthsOptions;
  }

  const YearOptions = () => {
    let year_options = [];
    let curryear = new Date().getFullYear();
    for (let i = created_at; i <= curryear; i++) {
      year_options.push(<Option value={i} key={i}>{i}</Option>)
    }
    return year_options;
  }

  return (
    <Container>
      {!localStorage.getItem('userid') && <Redirect to="/import" />}

      <Head>
        <CodeTime type="Monthly" time={total_time} />
      </Head>
      <GraphContainer>
        {currmonth &&
          <>
            <GraphContainerHeader>
              <Selection>
                <Selector name="month" value={monthno} onChange={(e) => setMonthno(Number(e.target.value))}>
                  {MonthOptions().map(item => (item))}
                </Selector>
                <Selector name="year" value={year} onChange={(e) => setYear(Number(e.target.value))}>
                  {YearOptions().map(item => (item))}
                </Selector>
              </Selection>
              <Display>
                <Icon onClick={() => setMonthno((monthno) => monthno <= 0 ? 11 : monthno - 1)}>
                  <MdChevronLeft />
                </Icon>
                <p>{monthNames[monthno]}</p>
                <Icon onClick={() => setMonthno((monthno) => monthno >= 11 ? 0 : monthno + 1)}>
                  <MdChevronRight />
                </Icon>
              </Display>
            </GraphContainerHeader>
            <VerticalBarGraph userData={currmonth} />
          </>
        }
      </GraphContainer>
    </Container>
  )
}

export default Monthly;